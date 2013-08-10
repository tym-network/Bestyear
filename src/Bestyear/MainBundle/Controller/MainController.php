<?php

namespace Bestyear\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MainController extends Controller
{
    public function indexAction()
    {
        if ($this->get('security.context')->isGranted('ROLE_USER')) {
            $now = date_create();
            $em = $this->getDoctrine()->getManager();
            
            // Users which birthday is today
            $query = $em->createQuery(
                "SELECT u 
                FROM BestyearUserBundle:User u 
                WHERE DATE_FORMAT(u.birthdate, '%m%d') = DATE_FORMAT(:now, '%m%d')"
            )->setParameter('now', $now);
            
            $birthdayUsers = $query->getResult();
            
            // Users which birthday is coming in 4 days
            $query = $em->createQuery(
                "SELECT u 
                FROM BestyearUserBundle:User u 
                WHERE DATE_FORMAT(u.birthdate, '%m%d') between DATE_FORMAT(DATE_ADD(:now, 1, 'day'), '%m%d') and date_format(DATE_ADD(:now, 4, 'day'), '%m%d')"
            )->setParameter('now', $now);
            
            $incomingBirthdayUsers = $query->getResult();
            
            return $this->render('BestyearMainBundle:Main:indexLogged.html.twig', array('todaysBirthday' => $birthdayUsers, 'incomingBirthdayUsers' => $incomingBirthdayUsers));
        } else {
            return $this->render('BestyearMainBundle:Main:indexNotLogged.html.twig', array());
        }
    }
    
    public function inscriptionAction()
    {
        return $this->render('BestyearMainBundle:Main:inscription.html.twig', array());
    }
}
