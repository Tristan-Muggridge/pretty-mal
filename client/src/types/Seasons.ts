enum Seasons {
	"spring" = "spring",
	"summer" = "summer",
	"fall" = "fall",
	"winter" = "winter"
}

export function getSeason(month: number) {
    switch (month) {
        case 0:
        case 1:
        case 2:
            return Seasons.winter;
        case 3:
        case 4:
        case 5:
            return Seasons.spring;
        case 6:
        case 7:
        case 8:
            return Seasons.summer;
        case 9:
        case 10:
        case 11:
            return Seasons.fall;
        default:
            return Seasons.winter;
    }
}

export default Seasons;