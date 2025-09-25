import {afterEach, describe, it, expect, vi} from "vitest";
import {createAccount, deleteAccounts, getAccounts} from "./account.service.js";

vi.mock("./account.repository", async (importOriginal) => {
    const originalModule = await importOriginal();

    return {
        ...originalModule,
        createAccountInRepository: vi.fn(() => ({
            id: 1,
            userId: 4,
            amount: 100,
        })),
        getAccountInRepository: vi.fn(() => ([
            {id: 1, userId: 4, amount: 100},
        ])),
        deleteAccountInRepository: vi.fn(() => ([
            {id: 1, userId: 4, amount: 100},
        ])),
    };
});

describe("Account Service", () => {
    afterEach(() => vi.clearAllMocks());

    it("should create an account", async () => {
        const account = await createAccount({
            userId: 4,
            amount: 100,
        });

        expect(account).toBeDefined();
        expect(account.id).toBeTypeOf("number");
        expect(account.userId).toBeTypeOf("number");
        expect(account.amount).toBeTypeOf("number");
    });


    it("should trigger a bad request error when account creation", async () => {
        try {
            await createAccount({
                userId: "xyz",
            });
            assert.fail("getAccount should trigger an error.");
        } catch (e) {
            expect(e.name).toBe('HttpBadRequest');
            expect(e.statusCode).toBe(400);
        }
    });

    it("should trigger a forbidden error when account creation", async () => {
        try {
            await createAccount({
                userId: 4,
                amount: 6,
            });
            assert.fail("createAccount should trigger an error.");
        } catch (e) {
            expect(e.name).toBe('HttpForbidden');
            expect(e.statusCode).toBe(403);
        }
    });

    it("should get given user's accounts", async () => {
        const accounts = await getAccounts({
            userId: 4,
        });

        expect(accounts).toBeDefined();
        expect(Array.isArray(accounts)).toBe(true);

        accounts.forEach((account) => {
            expect(account).toHaveProperty("id");
            expect(account).toHaveProperty("userId");
            expect(account).toHaveProperty("amount");
        });
    });

    it("should trigger a bad request error when getting accounts", async () => {
        try {
            await getAccounts({
                userId: "xyz",
            });
            assert.fail("getAccount should trigger an error.");
        } catch (e) {
            expect(e.name).toBe('HttpBadRequest');
            expect(e.statusCode).toBe(400);
        }
    });

    it("should delete given user's accounts", async () => {
        const accounts = await deleteAccounts({
            userId: 4,
        });

        expect(accounts).toBeDefined();
        expect(Array.isArray(accounts)).toBe(true);

        accounts.forEach((account) => {
            expect(account).toHaveProperty("id");
            expect(account).toHaveProperty("userId");
            expect(account).toHaveProperty("amount");
        });
    });

    it("should trigger a bad request error when deleting accounts", async () => {
        try {
            await deleteAccounts({
                userId: "xyz",
            });
            assert.fail("getAccount should trigger an error.");
        } catch (e) {
            expect(e.name).toBe('HttpBadRequest');
            expect(e.statusCode).toBe(400);
        }
    });
});
