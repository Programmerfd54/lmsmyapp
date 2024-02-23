import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: { courseId: string}}
){
    try {
        const { userId } = auth();
        if(!userId){
            return new NextResponse("Несанкционированно", {status: 401})
        }

        const { list } = await req.json();

        const onwCourse = await db.course.findUnique({
            where:{
                id: params.courseId,
                userId: userId
            }
        });
        if(!onwCourse){
            return new NextResponse("Несанкционированно", {status: 401})
        }
        for (let item of list){
            await db.chapter.update({
                where: { id: item.id },
                data: { position: item.position}
            })
        }

        return new NextResponse("Успех", {status: 200})
    } catch (error) {
        console.log("[CHAPTERS]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}