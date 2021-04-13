import {IsString} from "class-validator";

export class ReportInfectionRequest {
  @IsString()
  public reporterUsername!: string;

  @IsString()
  public infectedUsername!: string;
}
