<?php

namespace Bestyear\UserBundle\Controller;

use FOS\UserBundle\Controller\ProfileController as BaseController;

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Model\UserInterface;
use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class ProfileController extends BaseController 
{
    /**
     * Show the user
     */
    public function showAction()
    {
        $user = $this->container->get('security.context')->getToken()->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('This user does not have access to this section.');
        }
        
        $phones = array();
        if ($user->getPhone1() != null) {
            $phones['home'] = $user->getPhone1();
        }
        
        if ($user->getPhone2() != null) {
            $phones['school'] = $user->getPhone2();
        }
        
        if ($user->getCellphone() != null) {
            $phones['smartphone'] = $user->getCellphone();
        }
        
        $mails = array();
        $mails['school'] = $user->getEmail();
        if ($user->getEmailoptional() != null) {
            $mails['home'] = $user->getEmailoptional();
        }
        
        $addresses = array();
        if ($user->getStreetnumber1() != null) {
            $addresses['home'] = array(
                'num' => $user->getStreetnumber1(),
                'street' => $user->getStreet1(),
                'postcode' => $user->getPostcode1(),
                'city' =>$user->getCity1()
            );
        }
        
        if ($user->getStreetnumber2() != null) {
            $addresses['school'] = array(
                'num' => $user->getStreetnumber2(),
                'street' => $user->getStreet2(),
                'postcode' => $user->getPostcode2(),
                'city' =>$user->getCity2()
            );
        }
        
        $bdateShort = $user->getBirthdate()->format('md');
        $bdateYear = $user->getBirthdate()->format('Y');
        $nowShort = date('md');
        $nowYear = date('Y');
        $age = $bdateShort > $nowShort ? ($nowYear - $bdateYear - 1) : ($nowYear - $bdateYear);

        return $this->container->get('templating')->renderResponse('FOSUserBundle:Profile:show.html.'.$this->container->getParameter('fos_user.template.engine'), 
            array(
                'user' => $user,
                'phones' => $phones,
                'mails' => $mails,
                'addresses' => $addresses,
                'age' => $age,
            ));
    }
}