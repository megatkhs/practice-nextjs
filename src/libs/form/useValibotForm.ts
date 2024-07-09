import { valibotResolver } from '@hookform/resolvers/valibot'
import { FieldValues, UseFormProps, useForm } from 'react-hook-form'
import * as v from 'valibot'

export const useValibotForm = <
  Schema extends v.BaseSchema<FieldValues, unknown, v.BaseIssue<unknown>>,
>({
  schema,
  ...rest
}: UseFormProps<v.InferInput<Schema>> & {
  schema: Schema
}) => {
  return useForm({
    resolver: valibotResolver(schema),
    ...rest,
  })
}
