import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async initializePayment(dto: any) {
    const listing = await this.prisma.listings.findUnique({
      where: { listingId: dto.listingId },
    });

    if (!listing) throw new NotFoundException('Listing not found');

    const reference = `txn_${Date.now()}`;
    const amount = Math.round(Number(listing.price) * 100);

    await this.prisma.payment.create({
      data: {
        listingId: listing.listingId,
        amount,
        email: dto.email,
        status: 'pending',
        reference,
      },
    });

    return {
      paymentUrl: `${process.env.INTERSWITCH_BASE_URL}/collections/w/pay`,
      formData: {
        merchant_code: process.env.INTERSWITCH_MERCHANT_CODE,
        pay_item_id: process.env.INTERSWITCH_PAY_ITEM_ID,
        site_redirect_url: process.env.INTERSWITCH_REDIRECT_URL,
        txn_ref: reference,
        amount,
        currency: '566',
        cust_email: dto.email,
      },
    };
  }

  async verifyPayment(body: any) {
    const { txnref, amount } = body;

    const payment = await this.prisma.payment.findUnique({
      where: { reference: txnref },
    });

    if (!payment) throw new NotFoundException('Payment not found');

    const response = await axios.get(
      `${process.env.INTERSWITCH_QUERY_URL}/collections/api/v1/gettransaction.json`,
      {
        params: {
          merchantcode: process.env.INTERSWITCH_MERCHANT_CODE,
          transactionreference: txnref,
          amount,
        },
      },
    );

    const data = response.data;

    if (data.ResponseCode === '00' && data.Amount === payment.amount) {
      await this.prisma.payment.update({
        where: { reference: txnref },
        data: { status: 'success' },
      });

      return { status: 'success' };
    }

    await this.prisma.payment.update({
      where: { reference: txnref },
      data: { status: 'failed' },
    });

    return { status: 'failed' };
  }
}