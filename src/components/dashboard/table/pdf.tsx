import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export const TablePDF = ({
    headers,
    rows,
    title = "Table Report",
    subtitle = ""
}: {
    headers: string[],
    rows: any[][],
    title?: string,
    subtitle?: string
}) => {
    return (
        <div className="w-dvw print:block hidden" id="pdf-printable-content">
            {/* header */}
            <div className="text-center mb-6 pb-4 border-b">
                <h1 className="text-2xl font-bold mb-2 uppercase">{title}</h1>
                {subtitle && <p className="text-muted-foreground mb-2">{subtitle}</p>}
                <div className="flex justify-center gap-4 text-sm text-muted-foreground w-full">
                    <span>Generated: {new Date().toLocaleDateString('en', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</span>
                    <span>Time: {new Date().toLocaleTimeString('en', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</span>
                    <span>Records: {rows.length}</span>
                </div>
            </div>

            {/* table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border border-2 rounded">
                            {headers.map((header, index) => (
                                <TableHead key={index} className="font-black text-center text-black">
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <TableCell key={cellIndex} className="font-mono text-sm text-center max-w-20 truncate">
                                        {typeof cell === 'object' ? JSON.stringify(cell) : String(cell || '')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* footer */}
            <div className="mt-6 pt-4 border-t text-center text-sm text-muted-foreground">
                <div className="flex justify-between items-center">
                    <span>Total Records: {rows.length}</span>
                    <span>Report ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
            </div>
        </div>
    );
};