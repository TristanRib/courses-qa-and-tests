import {test, expect, request as playwrightRequest} from '@playwright/test';
import {faker} from '@faker-js/faker';

test('should create a comment', async () => {
    const apiContext = await playwrightRequest.newContext({
        baseURL: 'https://jsonplaceholder.typicode.com'
    });

    const newComment = await apiContext.post(`/comments`, {
        data: {
            name: faker.person.firstName(),
            email: faker.internet.email(),
            body: faker.lorem.paragraphs(2),
        },
    });
    expect(newComment.ok()).toBeTruthy();
});

test('should get all comments', async () => {
    const apiContext = await playwrightRequest.newContext({
        baseURL: 'https://jsonplaceholder.typicode.com'
    });

    const comments = await apiContext.get(`/comments`);
    expect(comments.ok()).toBeTruthy();
    expect(await comments.json()).toContainEqual(expect.objectContaining({
        name: "culpa eius tempora sit consequatur neque iure deserunt",
        email: "Kenton_Vandervort@friedrich.com",
        body: "et ipsa rem ullam cum pariatur similique quia\ncum ipsam est sed aut inventore\nprovident sequi commodi enim inventore assumenda aut aut\ntempora possimus soluta quia consequatur modi illo",
    }));
});

test('should get the first user', async () => {
    const apiContext = await playwrightRequest.newContext({
        baseURL: 'https://jsonplaceholder.typicode.com'
    });

    const user = await apiContext.get(`/users/1`);
    expect(user.ok()).toBeTruthy();
    expect(await user.json()).toEqual(expect.objectContaining({
        name: 'Leanne Graham',
        username: 'Bret',
        website: 'hildegard.org'
    }));
});

test('should delete a photo', async () => {
    const apiContext = await playwrightRequest.newContext({
        baseURL: 'https://jsonplaceholder.typicode.com'
    });

    const user = await apiContext.delete(`/photos/2`);
    expect(user.ok()).toBeTruthy();
});