import { RowDataPacket } from 'mysql2/promise';

export interface Employee extends RowDataPacket {
  id: string;
  name: string;
  position: string;
  costCenter: string;
  authorized: boolean;
  brand: string;
  model: string;
  serial: string;
  assignmentDate: string;
}

export interface EmployeeInput {
  name: string;
  position: string;
  costCenter: string;
  authorized: boolean;
  brand: string;
  model: string;
  serial: string;
  assignmentDate: string;
}
