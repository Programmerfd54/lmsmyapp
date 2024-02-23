"use client";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react"
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { Chapter, MuxData } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";


interface ChapterVideoFormProps{
    initialData: Chapter & { muxData?: MuxData | null };
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId,
}: ChapterVideoFormProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter();



    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        // console.log(values)
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Глава обновлена");
            toggleEdit();
            router.refresh();
            
        } catch  {
            toast.error("Что-то пошло не так...")
        }
    }
    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Видео курса
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing &&  (
                        <>Отмена</>
                    ) }
                    {!isEditing && !initialData.videoUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Добавить видео
                        </>
                    )}
                    {!isEditing && initialData.videoUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Редактировать видео
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <Video className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                       <MuxPlayer
                         playbackId={initialData?.muxData?.playbackId || ""}
                       />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload 
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            if(url) {
                                onSubmit({ videoUrl: url})
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Загрузите видео этой главы
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    Обработка видео может занять несколько минут. Обновите страницу, если видео не появляется
                </div>
            )}
        </div>
    )
}