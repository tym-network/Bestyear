<?php
namespace Bestyear\UserBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class FieldsNotBlank extends Constraint
{
    public $message = 'Champ vide';
    
    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}
