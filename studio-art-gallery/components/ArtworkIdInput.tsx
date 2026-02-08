import {useEffect} from 'react'
import {useFormValue, set, unset} from 'sanity'

export function ArtworkIdInput(props: any) {
  const {value, onChange} = props
  const docId = useFormValue(['_id'])

  useEffect(() => {
    if (!value && docId) {
      onChange(
        set(`ART-${Math.random().toString(36).substring(2, 8).toUpperCase()}`)
      )
    }
  }, [value, docId, onChange])

  return props.renderDefault(props)
}