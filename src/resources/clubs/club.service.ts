import clubModel from "@/resources/clubs/club.model";
import IClub from '@/resources/clubs/club.interface';


class ClubService {
    private club = clubModel;

    /**
     * Creates a new book club in the database
     * @param name - The name of the new club
     * @param leader - Email of the club leader
     * @param clubId 
     * @param status - club current status
     * @returns- 
     */
    public async createClub (name:string, leader: string) : Promise<IClub | Error> {
            return this.club.create({ name, leader });
    }

    /**
     * 
     * @param name 
     * @returns- the club or null
     */
    public async getClubByName (name:string) : Promise<string | null> {
        return this.club.findOne({ name });
    }
}

export default ClubService;
