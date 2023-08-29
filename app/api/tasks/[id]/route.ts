import { prisma } from '@/lib/prisma'
import { Task } from '@/types/task'
import { NextResponse } from 'next/server'

export async function GET(req: Request, {params}: { params: {id: number}} ){
    const task = await prisma.task.findUnique({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(task)

}

export async function PUT(req: Request, {params}: { params: {id: number}}){
    try {
        const body: Task = await req.json()
        const taskUpdated = await prisma.task.update({
            where: {
                id: Number(params.id)
            },
            data: body
        })
        return NextResponse.json(taskUpdated)
    } catch (error) {
        return NextResponse.json("No se ha podido modificar la tarea")
    }
}

export async function DELETE(req: Request, {params}: { params: {id: number}}){
    try {
        const taskRemoved = await prisma.task.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json(taskRemoved)
    } catch (error) {
        return NextResponse.json("La tarea no existe")
    }
}