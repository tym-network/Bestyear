<?php

namespace Bestyear\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MainController extends Controller
{
    public function indexAction()
    {
        if ($this->get('security.context')->isGranted('ROLE_USER')) {
            return $this->render('BestyearMainBundle:Main:indexLogged.html.twig', array());
        } else {
            return $this->render('BestyearMainBundle:Main:indexNotLogged.html.twig', array());
        }
    }
    
    public function inscriptionAction()
    {
        return $this->render('BestyearMainBundle:Main:inscription.html.twig', array());
    }
}
