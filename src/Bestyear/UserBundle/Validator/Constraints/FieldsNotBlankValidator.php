<?php

namespace Bestyear\UserBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class FieldsNotBlankValidator extends ConstraintValidator
{
    public function validate($user, Constraint $constraint)
    {
        // If one field is filled but not all address fields (for the first address)
        if (($user->getStreetNumber1() != null || $user->getStreet1()!=null || $user->getPostcode1()!=null || $user->getCity1()!=null || $user->getAddressmore1()!=null) && !($user->getStreetNumber1()!=null && $user->getStreet1()!=null && $user->getPostcode1()!=null && $user->getCity1()!=null)) {
            $this->context->addViolationAt("streetnumber1", $constraint->message, array(), null);
        }
        
        // If one field is filled but not all address fields (for the second address)
        if (($user->getStreetNumber2()!=null || $user->getStreet2()!=null || $user->getPostcode2()!=null || $user->getCity2()!=null || $user->getAddressmore2()!=null) && !($user->getStreetNumber2()!=null && $user->getStreet2()!=null && $user->getPostcode2()!=null && $user->getCity2()!=null)) {
            if ($user->getPostcode2()!="60200" && $user->getCity2()!="Compiègne") {
                $this->context->addViolationAt("streetnumber2", $constraint->message, array(), null);
            } else {
                $user->setPostcode2(null);
                $user->setCity2(null);
            }
        }
        
        // If one field is filled but not all fields (TN05)
        if (($user->getTn05Job() != null || $user->getTn05Place()!=null) && !($user->getTn05Job()!=null && $user->getTn05Place()!=null)) {
            $this->context->addViolationAt("tn05_job", $constraint->message, array(), null);
        }
        
        // If one field is filled but not all fields (TN07)
        if (($user->getTn07Job() != null || $user->getTn07Place()!=null) && !($user->getTn07Job()!=null && $user->getTn07Place()!=null)) {
            $this->context->addViolationAt("tn07_job", $constraint->message, array(), null);
        }
        
        // If one field is filled but not all fields (TN09)
        if (($user->getTn09Job() != null || $user->getTn09Place()!=null) && !($user->getTn09Job()!=null && $user->getTn09Place()!=null)) {
            $this->context->addViolationAt("tn09_job", $constraint->message, array(), null);
        }
        
        // If one field is filled but not all fields (TN10)
        if (($user->getTn10Job() != null || $user->getTn10Place()!=null) && !($user->getTn10Job()!=null && $user->getTn10Place()!=null)) {
            $this->context->addViolationAt("tn10_job", $constraint->message, array(), null);
        }
    }
}