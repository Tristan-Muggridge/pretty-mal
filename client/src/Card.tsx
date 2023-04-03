export default function Card ( {children, style}: {children: React.ReactNode[], style?: any}) {
    return (
        <div className='card' style={style ?? {}}>
            {children}
        </div>
    )
}