<?php

namespace PimOudeVeldhuis\NovaSelectDatabaseField;

use Laravel\Nova\Fields\Field;
use Laravel\Nova\Fields\SupportsDependentFields;
use Laravel\Nova\Http\Requests\NovaRequest;

class SelectDatabaseField extends Field
{
    use SupportsDependentFields;

    public $component = 'nova-component-select-database-field';

    public function options(array $options): static
    {
        return $this->withMeta(['options' => $options]);
    }

    protected function fillAttributeFromRequest(NovaRequest $request, $requestAttribute, $model, $attribute): void
    {
        if ($request->exists($requestAttribute)) {
            $model->{$attribute} = json_decode($request[$requestAttribute], true) ?: [];
        }
    }
}
