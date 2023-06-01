import UserIdGeneratorRepository from "../../domain/user.id.generator.repository";
import {v4 as uuidv4} from 'uuid'

export default class UserUuidRepository implements UserIdGeneratorRepository {
    
    generateUserId (): bigint {
        try {

            return BigInt.asUintN(64, BigInt(`0x${Buffer.from(uuidv4()).toString('hex')}`))
        
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

}