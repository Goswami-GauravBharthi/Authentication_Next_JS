import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    await connectDb();

    if (!(name || email || password)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter credential",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters.",
        },
        { status: 400 }
      );
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already registered.",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      password: hashedPassword,
      email,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `Server Error..${error}`,
      },
      { status: 500 }
    );
  }
}
