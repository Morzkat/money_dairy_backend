import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Wallet } from './wallet.type';
import { WalletsService } from './wallets.service';
import { Response } from './../core/entities/response.type';

@Controller('wallets')
export class WalletsController {
    constructor(private walletService: WalletsService) { }

    @Get()
    async getWallets() {
        return new Response<Array<Wallet>>(
            'Wallets',
            await this.walletService.getAll(),
        );
    }

    @Get(':id')
    async getWalletById(@Param('id') id: number) {
        return new Response<Wallet>(
            'Wallet details',
            await this.walletService.getById(id),
        );
    }

    @Post()
    async createWallet(@Body() wallet: Wallet) {
        return new Response<Wallet>(
            'New wallet created',
            await this.walletService.create(wallet),
        );
    }

    @Put(':id')
    async updateWallet(@Body() wallet: Wallet, @Param('id') id: number) {
        return new Response<void>(
            'Wallet updated',
            await this.walletService.update(id, wallet),
        );
    }

    @Delete(':id')
    async deleteWallet(@Param('id') id: number) {
        return new Response<void>(
            'Wallet deleted',
            await this.walletService.delete(id),
        );
    }
}
