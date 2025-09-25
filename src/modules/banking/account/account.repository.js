import {sql} from "../../../infrastructure/db";

export async function createAccountInRepository({userId, amount}) {
    const accounts = await sql`
        INSERT INTO accounts (userId, amount)
        VALUES (${userId}, ${amount}) RETURNING *
    `;

    return accounts[0];
}

export async function getAccountInRepository({userId}) {
    return await sql`
        SELECT *
        FROM accounts
        WHERE userId = ${userId};
    `;
}

export async function deleteAccountInRepository({userId}) {
    return await sql`
        DELETE
        FROM accounts
        WHERE userId = ${userId} RETURNING *;
    `;
}
