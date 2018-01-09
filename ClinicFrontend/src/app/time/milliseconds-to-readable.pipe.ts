import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'millisecondsToReadable'
})
export class MillisecondsToReadablePipe implements PipeTransform {
    
    transform(milliseconds: number, ): string {
        var days, hours, minutes, seconds;
        
        seconds = Math.floor(milliseconds / 1000);
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        days = Math.floor(hours / 24);
        hours = hours % 24;

        var response: string[] = [];

        if (days > 0) {
            days > 1 ? response.push(`${days} Days`) : response.push(`${days} Day`);
        }
        if (hours > 0) {
            hours > 1 ? response.push(`${hours} Hours`) : response.push(`${hours} Hour`);  
        }
        if (minutes > 0) {
            minutes > 1 ? response.push(`${minutes} Minutes`) : response.push(`${minutes} Minute`);
        }
        if (seconds > 0) {
            seconds > 1 ? response.push(`${seconds} Seconds`) : response.push(`${seconds} Second`);
        }

        return response.join(" ");
    }
    
}
