import userModel from "@/resources/user/user.model";
import token from '@/utils/helpers/auth.helper';

class UserService {
    private user = userModel;

    /**
     * Creates a new user in the database
     * @param name - The name of the new user
     * @param email - Email of the new user
     * @param password 
     * @returns- a token or an error 
     */
    public async signUp (name:string, email: string, password: string) : Promise<string | Error> {
        try {
            const user = await this.user.create({ name, email, password });
            const accessToken = token.createToken(user);
            return accessToken;
        } catch (error) {
            throw new Error('Unable to signup user');
        }
    }


    /**
     * Login a user
     * @param email - users email 
     * @param password - users password
     * @returns a user token or error
     */
    public async login (email: string, password: string) : Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });
            if (!user) throw new Error ('Unable to find user');
            if ( await user.isValidPassword(password)) return token.createToken(user);
            else throw new Error('Wrong email or password');
        } catch (error) {
            throw new Error('Unable to signup user');
        }
    }

    public async getUserByEmail (email: string) : Promise<string | null> {
        return this.user.findOne({ email })
    }

    public async updateUserClub (email: string, clubId: string) : Promise<string | null> {
        return this.user.findOneAndUpdate({ email },
            { $push: { club: clubId } }
            )
    }
}

export default UserService;
