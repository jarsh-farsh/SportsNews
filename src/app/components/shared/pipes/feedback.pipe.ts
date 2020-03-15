import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'feedback'
})
export class FeedbackPipe implements PipeTransform{
    
    
    transform(value: any) {
        if(value <= 999) return value;
        if(value >= 1000 && value < 1000000) return this.toDecimalPlace((value / 1000), 2) + 'K';
        else return (value / 1000000).toFixed(1) + 'M';
    }

    toDecimalPlace(value: number, decimals: number){
        var strNum = value.toString();
        var decimalIndex = strNum.indexOf('.');
        if(decimalIndex > 0){
            return strNum.substr(0, decimalIndex + decimals);
        }else{
            return value;
        }

    }

}