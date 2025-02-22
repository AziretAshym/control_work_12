import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Image from "./models/Image";
import {randomUUID} from "node:crypto";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('images');
    } catch (e) {
        console.log('Collections were not presents, skipping drop ');
    }

    const [painter_1, painter_2] = await User.create(
        {
            email: "test@gmail.com",
            displayName: "Claude Monet",
            password: "123",
            token: randomUUID(),
            avatar: 'fixtures/painter_1.jpeg',
            role: 'user',
        },
        {
            email: "test1@gmail.com",
            displayName: "Salvador Dali",
            password: "123",
            token: randomUUID(),
            avatar: 'fixtures/painter_2.jpeg',
            role: 'user',
        },
    );
    await Image.create(
        {
            user: painter_1,
            title: 'The Persistence of Memory',
            image: 'fixtures/the-persistence-of-memory.jpg',
        },
        {
            user: painter_1,
            title: 'Sans titre',
            image: 'fixtures/sans-titre.webp',
        },
        {
            user: painter_2,
            title: 'The woman in the garden',
            image: 'fixtures/zhenshchina-v-sadu.jpg',
        },
        {
            user: painter_2,
            title: 'Self-portrait in Beret',
            image: 'fixtures/avtoportret-v-berete.jpg',
        },


    );
    await db.close();
}

run().catch(console.error);