import React, { useEffect, useRef } from "react";
import { kebabCase } from "lodash";
import { TextInput, useFieldType } from "payload/components/forms";

import { TextField } from "payload/types";

export type SlugInputProps = TextField & {
  trackingField: string;
};

export default function SlugInput(props: SlugInputProps) {
  const {
    trackingField,
    required,
    admin: { readOnly },
  } = props;

  const { value: slugValue = "", setValue: setSlugValue } =
    useFieldType<string>({
      path: "slug",
    });

  const { value: trackingFieldValue } = useFieldType<string>({
    path: trackingField,
  });

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
            : `Will be auto-generated from ${trackingField} when saved`
        }
        value={slugValue}
        onChange={(e) => {
          setSlugValue(e.target.value);
          stopTrackingRef.current = true;
        }}
        readOnly={readOnly}
        required={required}
      />
    </div>
  );
}
