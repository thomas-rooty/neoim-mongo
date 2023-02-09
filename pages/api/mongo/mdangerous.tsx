import type {NextApiRequest, NextApiResponse} from 'next'
import clientPromise from "../../../lib/mongodb";

type Data = {
  mdangerous: any[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const client = await clientPromise;
    const db = await client.db("neoim-sentry");

    // Query the database for the most dangerous NEO (the one with the highest absolute value of the ip property)
    const mdangerous = await db
      .collection("neos")
      .find({})
      .sort({ip: -1})
      .limit(1)
      .toArray();

    res.status(200).json({mdangerous})
  } catch (error) {
    console.log(error)
  }
}
