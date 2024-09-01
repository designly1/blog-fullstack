import React, { useEffect, useRef } from "react";
import { kebabCase } from "lodash";
import { TextInput, useField, useWatchForm } from "payload/components/forms";

export interface SlugInputProps {
  trackingField: string;
}

export default function SlugInput(props: SlugInputProps) {
  const { trackingField } = props;

  const { getDataByPath } = useWatchForm();
  const { value: slugValue = "", setValue: setSlugValue } = useField<string>({
    path: "slug",
  });
  const trackingFieldValue = getDataByPath<string>(trackingField) || "";
  const prevTrackingFieldValueRef = useRef(trackingFieldValue);
  const stopTrackingRef = useRef(false);

  useEffect(() => {
    if (!trackingField || stopTrackingRef.current) {
      return;
    }
    if (trackingFieldValue === prevTrackingFieldValueRef.current) {
      return;
    }
    const prevSlugValue = kebabCase(prevTrackingFieldValueRef.current);
    prevTrackingFieldValueRef.current = trackingFieldValue;
    if (prevSlugValue !== slugValue) {
      return;
    }
    setSlugValue(kebabCase(trackingFieldValue));
  }, [trackingFieldValue]);

  return (
    <div>
      <TextInput
        name="slug"
        path="slug"
        label="Slug"
        description={
          slugValue
            ? `Auto generated based on ${trackingField}`
            : `Will be auto-generated from ${trackingField} when save`
        }
        value={slugValue}
        onChange={(e) => {
          setSlugValue(e.target.value);
          stopTrackingRef.current = true;
        }}
      />
    </div>
  );
}
