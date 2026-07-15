import { jwt } from "better-auth/plugins";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI as string);
const db = client.db("khamar-bazaar");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  // default role will be user
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      // 7 days in seconds
      maxAge: 7 * 24 * 60 * 60,
    },
  },
  plugins: [jwt()],
});
