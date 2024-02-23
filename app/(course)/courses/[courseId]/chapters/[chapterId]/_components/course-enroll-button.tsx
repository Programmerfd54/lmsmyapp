"use client";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";

interface CourseEnrollButtonProps{
    price: number;
    courseId: string;
}

export const CourseEnrollButton = ({
    price,
    courseId,
}: CourseEnrollButtonProps) =>{

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            
            setIsLoading(true);
            
            const response = await axios.post(`/api/courses/${courseId}/checkout`);

            window.location.assign(response.data.url);

        } catch {
            toast.error("Что-то пошло не так");
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <Button
            onClick={onClick}
            disabled={isLoading}
            size="sm"
            className="w-full md:w-auto"
        >
            Приобрести за {formatPrice(price)}
        </Button>
    )
}