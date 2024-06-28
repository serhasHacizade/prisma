import prisma from "@/lib/prisma";
import { Period, Timeframe } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";


const getHistoryDataSchema = z.object({
    timeframe: z.enum(["month", "year"]),
    month: z.coerce.number().min(0).max(11).default(0),
    year: z.coerce.number().min(2000).max(300),
});


export const GET = async (request: Request) => {
    const user = await currentUser();

    if (!user) redirect("/sign-in");

    const {searchParams} = new URL(request.url);
    const timeframe = searchParams.get("timeframe");
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    const queryParams = getHistoryDataSchema.safeParse({timeframe, month, year});

    if (!queryParams.success) return Response.json(queryParams.error.message, {status: 400});

    const data = await getHistoryData(user.id, queryParams.data.timeframe, {
        month: queryParams.data.month,
        year: queryParams.data.year,
    })
};


export type GetHistoryDataResponseType = Awaited<ReturnType<typeof getHistoryData>>;

const getHistoryData = async (userId: string, timeframe:Timeframe, period: Period) => {
    switch (timeframe) {
        case "year":
            return await getYearHistoryData(userId, period.year);
            case "month":
                return await getMonthHistoryData(userId, period.year, period.month);
    }
}

type HistoryData = {
    expense: number;
    income: number;
    year: number;
    month: number;
    day?: number;
}
const getYearHistoryData = async (userId: string, year: number) => {

    const result = await prisma.yearHistory.groupBy({
        by: ["month"],
        where: {
            userId, 
            year,
        },
        _sum: {
            expense: true,
            income: true,
        },
        orderBy: [{month: "asc"}]
    });

    if (!result || result.length === 0) return [];
    const history: HistoryData[] = [];


    for (let i = 0; i < 12; i++) {
        let expense = 0;
        let income = 0;

        const month = result.find((row) => row.month === i);
        
        
    }
};