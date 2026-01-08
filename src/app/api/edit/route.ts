import authOptions from "@/lib/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

   

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const image = formData.get("image") as Blob | null;
    let imageUrl ;
    if (image) {
      imageUrl = await uploadOnCloudinary(image);
    }

    const user = await User.findByIdAndUpdate(
      { _id: session.user.id },
      { name, image: imageUrl },
      { new: true }
    );

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error}, { status: 501 });
  }
}
 