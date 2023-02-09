import type {NextApiRequest, NextApiResponse} from 'next'
import clientPromise from "../../../lib/mongodb";

type Data = {
  neo: any[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: {des},
  } = req

  if (des) {
    // Query the mongo database
    try {
      // Connect to the MongoDB database
      const client = await clientPromise;
      const db = await client.db("neoim-sentry");

      // Query the database
      // des = 2020 QG for example
      const neo = await db
        .collection("neos")
        .find({
          des: des
        })
        .toArray();

      // Return the data, handle errors
      res.status(200).json({neo})
    } catch (error) {
      console.log(error)
    }
  }
}
