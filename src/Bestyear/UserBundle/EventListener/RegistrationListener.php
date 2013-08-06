<?php
namespace Bestyear\UserBundle\EventListener;

use FOS\UserBundle\Event\UserEvent as UserEvent;

class RegistrationListener
{
    public function overrideUserEmail(UserEvent $args)
    {
        $request = $args->getRequest();
        $formFields = $request->get('fos_user_registration_form');
        // here you can define specific email, ex:
        $email = $formFields['username'] . '@etu.utc.fr';
        $formFields['email'] = $email;
        $request->request->set('fos_user_registration_form', $formFields);
    }
}