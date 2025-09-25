import {HttpBadRequest, HttpForbidden} from "@httpx/exception";
import {z} from "zod";
import {createAccountInRepository, deleteAccountInRepository, getAccountInRepository} from "./account.repository";

export const MIN_AMOUNT = 10;

const AccountSchema = z.object({
    userId: z.number(),
    amount: z.number(),
});

export async function createAccount(data) {
    const result = AccountSchema.safeParse(data);

    if (result.success) {
        if (result.data.amount < MIN_AMOUNT) {
            throw new HttpForbidden("A minimum amount of 10$ is required to create an account.");
        }

        return createAccountInRepository(result.data);
    } else {
        throw new HttpBadRequest(result.error);
    }
}

const UserIDAccountSchema = z.object({
    userId: z.number(),
});

export async function getAccounts(data) {
    const result = UserIDAccountSchema.safeParse(data);

    if (result.success) {
        return getAccountInRepository(result.data);
    } else {
        throw new HttpBadRequest(result.error);
    }
}

export async function deleteAccounts(data) {
    const result = UserIDAccountSchema.safeParse(data);

    if (result.success) {
        return deleteAccountInRepository(result.data);
    } else {
        throw new HttpBadRequest(result.error);
    }
}