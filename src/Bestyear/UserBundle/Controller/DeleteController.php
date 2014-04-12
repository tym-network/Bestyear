<?php

namespace Bestyear\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DeleteController extends Controller
{
    public function indexAction() {
        if ($this->get('security.context')->isGranted('ROLE_USER')) {
            return $this->render('BestyearUserBundle:Profile:delete.html.twig', array());
        } else {
            return $this->render('BestyearMainBundle:Main:indexNotLogged.html.twig', array());
        }
    }
    public function deleteAction(Request $request)
    {
        if ('POST' === $request->getMethod()) {
            if ($this->get('security.context')->isGranted('ROLE_USER')) {
                $userManager = $this->get('fos_user.user_manager');
                $user = $this->getUser();
                if ($user !== null) {
                    $userManager->deleteUser($user);
                    return $this->render('BestyearUserBundle:Profile:deleted.html.twig', array());
                }
            }
        }
        return $this->render('BestyearMainBundle:Main:indexNotLogged.html.twig', array());
    }
}
