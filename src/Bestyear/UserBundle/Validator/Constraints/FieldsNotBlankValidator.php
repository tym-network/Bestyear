<?php

namespace Bestyear\UserBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class FieldsNotBlankValidator extends ConstraintValidator
{
    public function validate($user, Constraint $constraint)
    {
        // If one field is filled but not all of fields (for the first address)
        if (($user->getStreetNumber1() != null || $user->getStreet1()!=null || $user->getPostcode1()!=null || $user->getCity1()!=null) && !($user->getStreetNumber1()!=null && $user->getStreet1()!=null && $user->getPostcode1()!=null && $user->getCity1()!=null)) {
            $this->context->addViolationAt(array("streetnumber1", "street1", "postcode1", "city1"), $constraint->message, array(), null);
        }
        
        // If one field is filled but not all of fields (for the second address)
        if (($user->getStreetNumber2()!=null || $user->getStreet2()!=null || $user->getPostcode2()!=null || $user->getCity2()!=null) && !($user->getStreetNumber2()!=null && $user->getStreet2()!=null && $user->getPostcode2()!=null && $user->getCity2()!=null)) {
            if ($user->getPostcode2()!="60200" && $user->getCity2()!="Compiègne") {
                $this->context->addViolationAt(array("streetnumber2", "street2", "postcode2", "city2"), $constraint->message, array(), null);
            } else {
                $user->setPostcode2(null);
                $user->setCity2(null);
            }
        }
        
        // If one field is filled but not all of fields (TN05)
        if (($user->getTn05Job() != null || $user->getTn05Place()!=null) && !($user->getTn05Job()!=null && $user->getTn05Place()!=null)) {
            $this->context->addViolationAt(array("tn05_place", "tn05_job"), $constraint->message, array(), null);
        }
        
        // If one field is filled but not all of fields (TN05)
        if (($user->getTn07Job() != null || $user->getTn07Place()!=null) && !($user->getTn07Job()!=null && $user->getTn07Place()!=null)) {
            $this->context->addViolationAt(array("tn05_place", "tn05_job"), $constraint->message, array(), null);
        }
        
        // If one field is filled but not all of fields (TN05)
        if (($user->getTn09Job() != null || $user->getTn09Place()!=null) && !($user->getTn09Job()!=null && $user->getTn09Place()!=null)) {
            $this->context->addViolationAt(array("tn05_place", "tn05_job"), $constraint->message, array(), null);
        }
        
        // If one field is filled but not all of fields (TN05)
        if (($user->getTn10Job() != null || $user->getTn10Place()!=null) && !($user->getTn10Job()!=null && $user->getTn10Place()!=null)) {
            $this->context->addViolationAt(array("tn05_place", "tn05_job"), $constraint->message, array(), null);
        }
    }
}