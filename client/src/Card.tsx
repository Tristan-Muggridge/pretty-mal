export default function Card ( {children, variant}: {children: React.ReactNode[] | React.ReactNode, variant?: any}) {
    return (
        <div className={`card`}>
            {children}
        </div>
    )
}