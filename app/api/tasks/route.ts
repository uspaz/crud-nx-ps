import { prisma } from '@/lib/prisma'
import { Task } from '@/types/task'
import { NextResponse } from 'next/server'

export async function GET(){
    const tasks = await prisma.task.findMany()
    return NextResponse.json(tasks)
}

export async function POST(request: Request){
    const body: Task = await request.json()
    const newTask = await prisma.task.create({
        data: body
    })
    return NextResponse.json(newTask)
}
