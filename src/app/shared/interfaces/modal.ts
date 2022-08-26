import { Type } from "@angular/core";

export interface IModalSetup<T>
{
    title?: string;
    component: Type<T>;
    context?: Partial<T>;
    size?: 'lg' | 'sm' | 'xl';
}
