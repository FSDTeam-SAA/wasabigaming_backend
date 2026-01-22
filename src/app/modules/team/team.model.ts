import { Schema, model } from 'mongoose';
import { ITeam } from './team.interface';


const teamSchema = new Schema<ITeam>(
  {
    name:{
        type:String,
    },
    profession:{
        type:String
    },
    image:{
        type:String
    }
  },
  { timestamps: true },
);


const Team = model<ITeam>('Team', teamSchema);

export default Team;
