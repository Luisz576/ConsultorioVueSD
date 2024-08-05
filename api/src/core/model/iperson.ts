export default interface IPerson{
  id: Number
  name: string
  cpf: string
  email: string
  cellPhone: string
}

export interface IPersonRequiredAndPartial{
  id: Number | undefined
  name: string
  cpf: string
  email: string | undefined
  cellPhone: string | undefined
}
