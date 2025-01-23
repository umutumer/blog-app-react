import { ButtonHTMLAttributes, FC, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../../libs/utils'

interface ButtonProps { }

const buttonVariants = cva(
    "px-6 py-3 font-bold text-white rounded-lg bg-gradient-to-r from-red-400 to-pink-600",

    {
        variants: {
            variant: {
                default: "md:px-6 px-2 md:py-3 py-1 md:font-bold font-normal text-white rounded-lg bg-gradient-to-r from-red-400 to-pink-600 duration-300",
                outline: "bg-none border border-red-400 text-pink-600 hover:bg-gradient-to-r hover:from-red-400 hover:to-pink-600 hover:text-white hover:border-none duration-300",
                ghost :"bg-none border-none text-pink-600"
            },
            size:{
                default:"md:w-32 w-28 md:h-12 h-8",
                sm:"w-20 h-10",
                md:"w-28 h-12",
                lg:"md:w-40 w-36 md:h-12 h-8 "
            }
        },
        defaultVariants:{
            variant:"default",
            size:"default"
        }
    }
)
interface   ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({className,size,variant,...props},ref) => {
    return (
        <button ref={ref} className={cn(buttonVariants({variant,size,className}))}  {...props}/>
    )
})

export  {Button,buttonVariants}
