# Database Select Array Nova Field

This package provides a reusable Laravel Nova field for selecting and
editing an ordered array of values stored as JSON.

```php
use PimOudeVeldhuis\NovaSelectDatabaseField\SelectDatabaseField;

SelectDatabaseField::make('Required questions', 'required_questions')
    ->options([
        1 => 'First question',
        2 => 'Second question',
    ]);
```

The selected values are submitted as a JSON array and stored through the
configured model cast.

The field also supports Nova's dependent field APIs through the
`SupportsDependentFields` trait:

```php
use Laravel\Nova\Http\Requests\NovaRequest;

SelectDatabaseField::make('Required questions', 'required_questions')
    ->dependsOn('category', function (SelectDatabaseField $field, NovaRequest $request, $formData): void {
        $field->options($formData->category === 'advanced'
            ? [1 => 'Advanced question']
            : []);
    });
```
