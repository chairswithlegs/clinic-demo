//Ng CORE
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'millisecondsToReadable'
})
export class MillisecondsToReadablePipe implements PipeTransform {
	
	transform(milliseconds: number, smallestUnit: number, largestUnit: number): string {
		if (smallestUnit < 1 || largestUnit > 4 || smallestUnit > largestUnit) {
			throw new Error(`${smallestUnit} and ${largestUnit} are invalid arguments.
			First argument must be smaller than the second. Must be between 1 - 4.`);
		}
		
		let days, hours, minutes, seconds;
		
		seconds = Math.floor(milliseconds / 1000);
		minutes = Math.floor(seconds / 60);
		seconds = seconds % 60;
		hours = Math.floor(minutes / 60);
		minutes = minutes % 60;
		days = Math.floor(hours / 24);
		hours = hours % 24;
		
		const response: string[] = [];
		
		if (days > 0 && largestUnit >= 4 && smallestUnit <= 4) {
			days > 1 ? response.push(`${days} Days`) : response.push(`${days} Day`);
		}
		if (hours > 0 && largestUnit >= 3 && smallestUnit <= 3) {
			hours > 1 ? response.push(`${hours} Hours`) : response.push(`${hours} Hour`);  
		}
		if (minutes > 0 && largestUnit >= 2 && smallestUnit <= 2) {
			minutes > 1 ? response.push(`${minutes} Minutes`) : response.push(`${minutes} Minute`);
		}
		if (seconds > 0 && largestUnit >= 1 && smallestUnit <= 1) {
			seconds > 1 ? response.push(`${seconds} Seconds`) : response.push(`${seconds} Second`);
		}
		
		return response.join(' ');
	}
	
}
