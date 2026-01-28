"use client";
import { format as formatFnc } from "date-fns";
import { useState } from "react";

type DateFormats =
    "yyyy-MM-dd" |
    "dd/MM/yyyy" |
    "MM/dd/yyyy" |
    "do MMMM yyyy" |
    "dd MMM yyyy" |
    "PPP" |
    "PP" |
    "PPPP" |
    "EEE, MMM d" |
    "HH:mm:ss"

const formatExtensions: string[] = [
    "yyyy-MM-dd",
    "dd/MM/yyyy",
    "MM/dd/yyyy",
    "do MMMM yyyy",
    "dd MMM yyyy",
    "PPP",
    "PP",
    "PPPP",
    "EEE, MMM d",
    "HH:mm:ss",
];

export const FormattedDate = ({ date, format }: { date: string | null, format?: DateFormats }) => {
    const [formatCounter, setFormatCounter] = useState(formatExtensions.indexOf(format || formatExtensions[0]));

    const seeAnotherFormats = () => {
        if (formatCounter === formatExtensions.length - 1) {
            setFormatCounter(0);
        } else {
            setFormatCounter(prev => prev + 1);
        }
    };

    return (
        <span onClick={seeAnotherFormats} className="cursor-pointer select-none"
            title={date ? formatFnc(date, formatExtensions[formatCounter]) : ''}
        >
            {date ? formatFnc(date, formatExtensions[formatCounter]) : 'N/A'}
        </span>

    )
}