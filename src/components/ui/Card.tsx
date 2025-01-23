import { FC } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../libs/utils";
import { Button } from "./Button";
import { HiOutlineBookOpen } from "react-icons/hi";
import { Link } from "react-router";
const cardVariants = cva(
    " overflow-hidden border bg-white",
    {
        variants: {
            variant: {
                default: "border-none p-2 m-2",
                shadow: "shadow-lg",
                bordered: "border-gray-300",
            },
            size: {
                sm: "w-64 h-80",
                md: "w-80 h-96",
                lg: "md:w-[350px] w-[300px] md:h-[600px] h-[500px]",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
);

interface CardProps extends VariantProps<typeof cardVariants> {
    imgSrc: string;
    title: string;
    description: string;
    buttonText?: string;
    onButtonClick?: () => void;
    className?: string;
    minute?: number;
    keywords?: string[];
}

const Card: FC<CardProps> = ({
    imgSrc,
    title,
    description,
    buttonText = "Devamını Oku",
    onButtonClick,
    variant,
    size,
    className,
    minute,
    keywords,
}) => {
    return (
        <div className={cn(cardVariants({ variant, size, className }))}>
            <Link to={`/blog-detail/${title}`}>
                <img src={imgSrc} alt={title} className="w-full md:h-[300px] h-[250px] object-cover rounded-lg shadow" />
            </Link>
            <div>
                <h1 className="md:text-xl text-base font-bold md:my-5 my-2 decoration-transparent inline-block underline-offset-8 hover:underline hover:underline-offset-0 hover:decoration-cyan-400  hover:[text-decoration-thickness:4px] duration-500 transition-all">{title}</h1>
                <p className="text-gray-600 md:mb-5 mb-2 md:text-base text-sm">{description}</p>
                {keywords && keywords.length > 1 ? (
                    <div className="w-full flex flex-wrap md:mb-5 mb-2">
                        {keywords.map(keyword => (
                            <p className="bg-pink-500 text-[10px] text-white p-1 rounded-xl m-1">#{keyword}</p>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p>{keywords}</p>
                    </div>
                )}
                <div className="flex justify-between">
                    <Link to={`/blog-detail/${title}`}>
                        <Button onClick={onButtonClick} variant="default" size="lg">
                            {buttonText}
                        </Button>
                    </Link>
                    {minute && (
                        <p className="flex items-center md:text-lg text-base font-medium text-slate-700"><HiOutlineBookOpen />{minute}m read</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export { Card, cardVariants };
