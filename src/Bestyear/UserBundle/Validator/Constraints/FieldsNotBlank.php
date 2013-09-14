<?php
namespace Bestyear\UserBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class FieldsNotBlank extends Constraint
{
    public $message = 'Veuillez remplir tous les champs';
    
    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}
