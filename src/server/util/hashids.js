import Hashids from 'hashids';
import { hashidsSalts } from '../config.json';

export const hashidsDogs = new Hashids(hashidsSalts.dogs, 4);
export const hashidsUsers = new Hashids(hashidsSalts.users, 4);
export const hashidsLitters = new Hashids(hashidsSalts.litters, 4);
export const hashidsFosters = new Hashids(hashidsSalts.fosters, 4);
export const hashidsCheckouts = new Hashids(hashidsSalts.checkouts, 4);
