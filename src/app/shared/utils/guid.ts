export class Guid
{
    public static create(): string
    {
        return [ Guid.gen( 2 ), Guid.gen( 1 ), Guid.gen( 1 ), Guid.gen( 1 ), Guid.gen( 3 ) ].join( "-" );
    }

    private static gen( count: number )
    {
        let out: string = "";
        for ( let i: number = 0; i < count; i++ )
        {
            out += ( ( ( 1 + Math.random() ) * 0x10000 ) | 0 ).toString( 16 ).substring( 1 );
        }
        return out;
    }
}
